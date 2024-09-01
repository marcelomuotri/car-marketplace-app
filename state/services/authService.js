import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import {
  loginFailure,
  loginSuccess,
  logoutSuccess,
  loginLoading,
  loginStopLoading,
} from '../slices/authSlice'
import { auth, db } from '../../firebaseConfig'
import { createUserPayload } from '@/models/authModel'
import { onAuthStateChanged, updatePassword } from 'firebase/auth'

export const useAuthService = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, 'users', firebaseUser.uid)
        const docSnap = await getDoc(docRef)
        const payload = {
          userData: docSnap.data(),
          user: firebaseUser.email,
        }
        dispatch(loginSuccess(payload))
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
        //modelo para guardar datos
        const payload = {
          user: user.email,
        }
        dispatch(loginSuccess(payload))
      }
    } catch (error) {
      console.log(error)
      dispatch(loginFailure(error.message))
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
        const userPayload = createUserPayload(user)
        await saveUserToFirestore(userPayload, user.uid)
        dispatch(loginSuccess({ user: user.email, userData: userPayload }))
        return user
      } else {
        throw new Error('User creation failed')
      }
    } catch (error) {
      console.error('Error creating user:', error)
      dispatch(loginFailure(error.message))
    }
  }

  const saveUserToFirestore = async (userPayload, uid) => {
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

  return { loginUser, logoutUser, createUser, changePassword }
}
