const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User' // referencing the model 'user'
        },
        text: {
            type: String,
            required: [true, 'Please add a text value']
        }
    },
    {
        // automarically adds createdAt, updatedAt fields
        timestamps: true
    }
);

module.exports = mongoose.model('Goal', goalSchema);