import { ImageInterface } from '@/types/image.interface'
import { StatusType } from '@/constants/enumStatusType'

export interface TaskInterface{
  id: string,
  avatar: ImageInterface,
  firstname: string,
  lastname: string,
  status:StatusType,
  name: string,
  description: string,
  src?: ImageInterface,
  time: number,
  halfDay: string,
  dateOfCompletion: string
}
