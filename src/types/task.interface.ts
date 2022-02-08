import { ImageInterface } from '@/types/image.interface'
import { StatusType } from '@/constants/enumStatusType'
export interface Date{
  date: string
  halfDay: string
  time: string
  title: string
}
export interface TaskInterface{
  id: number
  avatar: ImageInterface
  firstname: string
  lastname: string
  status:StatusType
  name: string
  description: string
  src?: ImageInterface
  time: number
  halfDay: string
  executeBefore: Date
  postDate: Date
  colors: string
  customData: Date
}
