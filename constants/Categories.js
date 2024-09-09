// src/constants/options.ts

import MotorbikeIcon from '@/assets/icons/MotorbikeIcon'
import KartingIcon from '@/assets/icons/KartingIcon'
import ATVsIcon from '@/assets/icons/ATVsIcon'
import CarIcon from '@/assets/icons/CarIcon'
import EngineIcon from '@/assets/icons/EngineIcon'
import UnitPieceIcon from '@/assets/icons/UnitPieceIcon'
import EquipmentIcon from '@/assets/icons/EquipmentIcon'
import AccesoriesIcon from '@/assets/icons/AccesoriesIcon'
import ToolsIcon from '@/assets/icons/ToolsIcon'
import ServicesIcon from '@/assets/icons/ServicesIcon'

export const competitionCategories = [
  //aca habria que tener las singulares para las competiciones
  { id: '1', label: 'Autos', value: 'auto', Icon: <CarIcon /> },
  { id: '2', label: 'Motos', value: 'moto', Icon: <MotorbikeIcon /> },
  { id: '3', label: 'ATVs', value: 'atv', Icon: <ATVsIcon /> },
  { id: '4', label: 'Kartings', value: 'karting', Icon: <KartingIcon /> },
]

export const staticCategories = [
  {
    id: '5',
    label: 'Motores',
    value: 'motores',
    Icon: <EngineIcon />,
  },
  {
    id: '6',
    label: 'Partes',
    value: 'partes',
    Icon: <UnitPieceIcon />,
  },
  {
    id: '7',
    label: 'Indumentaria',
    value: 'indumentaria',
    Icon: <EquipmentIcon />,
  },
  {
    id: '8',
    label: 'Accesorios',
    value: 'accesorios',
    Icon: <AccesoriesIcon />,
  },
  {
    id: '9',
    label: 'Herramientas',
    value: 'herramientas',
    Icon: <ToolsIcon />,
  },
  { id: '10', label: 'Servicios', value: 'servicios', Icon: <ServicesIcon /> },
]
