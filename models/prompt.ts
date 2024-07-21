import { Model, Schema, model, models } from 'mongoose'
import { IUser } from './user'

export interface IPrompt {
  _id: Schema.Types.ObjectId
  creator: IUser
  prompt: string
  tag: string
}

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required'],
  },
})

const Prompt: Model<IPrompt> =
  models.Prompt || model<IPrompt>('Prompt', PromptSchema)

export default Prompt
