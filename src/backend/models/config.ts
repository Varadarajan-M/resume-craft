import mongoose, { InferSchemaType } from 'mongoose';

const appConfigSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true },
  config: { type: mongoose.Schema.Types.Mixed, required: true },
});

type AppConfigModel = InferSchemaType<typeof appConfigSchema>;

const AppConfig =
  mongoose.models?.AppConfig ||
  mongoose.model<AppConfigModel>('AppConfig', appConfigSchema);

export default AppConfig as mongoose.Model<AppConfigModel>;
