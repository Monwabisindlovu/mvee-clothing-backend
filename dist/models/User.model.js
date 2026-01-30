import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
});
UserSchema.methods.comparePassword = async function (candidate) {
    return bcrypt.compare(candidate, this.password);
};
export default mongoose.model('User', UserSchema);
//# sourceMappingURL=User.model.js.map