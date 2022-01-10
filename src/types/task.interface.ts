import { ImageInterface } from '@/types/image.interface'
import { StatusType } from '@/constants/enumStatusType'
export interface Data{
  date: string
  halfDay: string
  time: string
}
export interface TaskInterface{
  id: string
  avatar: ImageInterface
  firstname: string
  lastname: string
  status:StatusType
  name: string
  description: string
  src?: ImageInterface
  time: number
  halfDay: string
  executeBefore: Data
  postDate: Data
}
