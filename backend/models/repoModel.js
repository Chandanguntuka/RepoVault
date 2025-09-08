const mongoose = require("mongoose");   
const { Schema } = mongoose;    

const RepositorySchema= new Schema({

  // timestamps: true,
  // this will add createdAt and updatedAt fields automatically
    name: {
        type:String,
        required: true,
        required: true,
        unique:true,
    },
    description : {
        type:String,

    },
    content:[ 
        {
            type:String,
        }
    ],
    visibility: {
        type: Boolean,
        //its is used to woork on the whaaether the acount is private or public
    },

  
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Issue",
      // multiple issues 
    },
  ],
}, { timestamps: true });

const Repository = mongoose.model("Repository", RepositorySchema);

// const Repository = mongoose.model("Repository", RepoSchema);
// module.exports = Repository;

// export default Repository;
module.exports = Repository;
// module.exports = RepoSchema;