import mongoose, { model, Schema, Document, modelNames } from 'mongoose'

export interface UserDocument extends Document {
  name: string
  email: string
  password: string
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})


//if user model already exist don't recreate it
const UserModel = (modelNames().indexOf('User') !== -1)
  ? model<UserDocument>('User')
  : model<UserDocument>('User', UserSchema)
export default UserModel
