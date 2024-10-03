import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Alert } from 'react-native'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser as firebaseDeleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import {
  loginFailure,
  loginSuccess,
  logoutSuccess,
  loginLoading,
  loginStopLoading,
  startReauthenticating,
  stopReauthenticating,
} from '../slices/authSlice'
import { auth, db } from '../../firebaseConfig'
import { createUserPayload } from '@/models/authModel'
import {
  onAuthStateChanged,
  updatePassword,
  sendEmailVerification,
} from 'firebase/auth'
import {
  convertIsoStringToTimestamp,
  convertTimestampToIsoString,
} from '../firebaseApi/firebaseApi'
import * as WebBrowser from 'expo-web-browser'

export const useAuthService = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser?.emailVerified) {
        const docRef = doc(db, 'users', firebaseUser.uid)
        const docSnap = await getDoc(docRef)
        const payload = {
          userData: docSnap.data(),
          user: firebaseUser.email,
        }
        const parsePayloadData = {
          userData: convertTimestampToIsoString(payload.userData),
          user: firebaseUser.email,
        }

        dispatch(loginSuccess(parsePayloadData))
      } else {
        dispatch(loginFailure())
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [dispatch])

  const loginUser = async ({ email, password }) => {
    dispatch(loginLoading())
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const user = userCredential.user
      if (user) {
        if (user.emailVerified) {
          //modelo para guardar datos
          const payload = {
            user: user.email,
          }
          dispatch(loginSuccess(payload))
          return user
        } else if (!user.emailVerified) {
          await auth.signOut()
          dispatch(loginFailure('notVerified'))
          return user
        }
      }
    } catch (error) {
      console.log(error)
      dispatch(loginFailure('incorrectPassword'))
    }
  }
  const createUser = async ({ email, password }) => {
    dispatch(loginLoading())
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const user = userCredential.user

      if (user) {
        await sendEmailVerification(user)
        const userPayload = createUserPayload(user)
        await saveUserToFirestore(userPayload, user.uid)
        //dispatch(loginSuccess({ user: user.email, userData: userPayload }))
        await auth.signOut()
        return user
      }
    } catch (error) {
      console.error('Error creating user:', error)
      dispatch(loginFailure(error.message))
    }
  }

  const createUserFromGoogle = async (result) => {
    //TODO

    const isNewUser = result._tokenResponse.isNewUser
    if (isNewUser) {
      const userPayload = createUserPayload(result.user)
      const userPayloadForFirebase = convertIsoStringToTimestamp(userPayload)
      saveUserToFirestore(userPayloadForFirebase, result.user.uid)
      //aca si tengo problemas puedo volver a ponerle el uid al userData para ver si se arregla
    }
  }

  const saveUserToFirestore = async (userPayload, uid) => {
    userPayload.favoriteCompetition = 'auto'
    try {
      const userDocRef = doc(db, 'users', uid)
      await setDoc(userDocRef, userPayload)
    } catch (e) {
      console.error('Error adding document to Firestore:', e)
    }
  }

  const logoutUser = async () => {
    try {
      await signOut(auth)
      WebBrowser.dismissBrowser()
      dispatch(logoutSuccess())
    } catch (error) {
      //TODO logout failure
      console.log(error)
    }
  }

  const changePassword = async (oldPassword, newPassword) => {
    dispatch(loginLoading())
    try {
      const user = auth.currentUser
      const email = user.email

      // Inicia sesión con la contraseña antigua
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        oldPassword,
      )

      await updatePassword(userCredential.user, newPassword)
      dispatch(loginStopLoading())

      return { status: 'ok' }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error)
      dispatch(loginStopLoading())
      return { status: 'error', message: error.message }
    }
  }

  const getAuthProvider = () => {
    const user = auth.currentUser
    if (user) {
      const providerId = user.providerData[0]?.providerId
      if (providerId === 'password') {
        return 'password'
      } else if (providerId === 'google.com') {
        return 'google'
      }
    }
    return null
  }

  const handleGoogleDelete = async () => {
    dispatch(loginLoading())
    let user = auth.currentUser

    if (!user) {
      console.error('No user is currently signed in.')
      return
    }

    try {
      // Intentar eliminar la cuenta
      await firebaseDeleteUser(user)
      console.log('User deleted successfully.')
    } catch (error) {
      // Si el token es inválido o expira, se lanzará un error de reautenticación
      if (error.code === 'auth/requires-recent-login') {
        console.log('Token inválido o expirado, pidiendo reautenticación...')

        // Mostrar alerta explicando la situación
        Alert.alert(
          'Reautenticación necesaria',
          'Para eliminar tu cuenta, es necesario que vuelvas a iniciar sesión. Serás deslogueado y tendrás que volver a autenticarse.',
          [
            {
              text: 'OK',
              onPress: async () => {
                // Cerrar la sesión del usuario
                await signOut(auth)

                console.log('User signed out for reauthentication.')

                // Aquí puedes redirigir al usuario a la pantalla de inicio de sesión si es necesario
                // Ejemplo: navigation.navigate('Login');
              },
            },
          ],
        )
      } else {
        console.error('Error al eliminar el usuario:', error)
      }
    }
  }

  const handlePasswordDelete = async (data) => {
    dispatch(loginLoading())
    dispatch(startReauthenticating())

    const { password } = data

    try {
      const user = auth.currentUser
      const email = user.email

      const credential = EmailAuthProvider.credential(email, password)

      // Re-autenticar al usuario
      await reauthenticateWithCredential(user, credential)

      await firebaseDeleteUser(user)
      dispatch(logoutSuccess())
      WebBrowser.dismissBrowser()
    } catch (error) {
      dispatch(loginFailure('passwordNotCorrect'))
    } finally {
      dispatch(stopReauthenticating()) // Detener reautenticación, sea éxito o fallo
    }
  }
  const deleteUser = async (password) => {
    try {
      const user = auth.currentUser
      if (user) {
        // Obtener el correo del usuario
        const email = user.email

        // Crear las credenciales nuevamente
        const credential = EmailAuthProvider.credential(email, password)

        // Re-autenticar al usuario
        await reauthenticateWithCredential(user, credential)

        // Eliminar la cuenta después de la re-autenticación
        await firebaseDeleteUser(user)
        dispatch(logoutSuccess())
        WebBrowser.dismissBrowser()
        console.log('User deleted successfully.')
      } else {
        console.error('No user is signed in.')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return {
    loginUser,
    logoutUser,
    createUser,
    changePassword,
    createUserFromGoogle,
    deleteUser,
    getAuthProvider,
    handleGoogleDelete,
    handlePasswordDelete,
  }
}
