import Address from "../models/addressmodel.js";


// Create Address
export const address = async (req, res) => {
    try {
        const {phone, pincode, address, city, state, country } = req.body;
        const userId = req.user.id;

        if ( !phone || !pincode || !address || !city || !state) {
            return res.status(400).json({
                status: false,
                message: "Please provide all required fields (fullname, phone, pincode, address, city, state)",
            });
        }

        const newAddress = await Address.create({
            userId,
          
            phone,
            pincode,
            address,
            city,
            state,
            country,
        });

        res.status(201).json({
            status: true,
            message: "Address created successfully",
            address: newAddress,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error creating address",
            error: error.message,
        });
    }
};
 


// get address 


export const getaddress = async (req, res) => {
    try {
       

        const getnewAddress = await Address.find();
    
        if(getnewAddress){
            return   res.status(201).json({
            status: true,
            message: "Address  successfully",
            address: getnewAddress,
        });
        }else{
              res.status(400).json({
            status: false,
            message: "not found",
          
        });
        }
      
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error creating address",
            error: error.message,
        });
    }
};

//update address



export const updateaddress = async (req, res) => {
    try {
       

        const upAddress = await Address.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
    
        if(upAddress){
            return   res.status(201).json({
            status: true,
            message: "Address updated successfully",
            address: upAddress,
        });
        }else{
              res.status(400).json({
            status: false,
            message: "not update",
          
        });
        }
      
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error creating address",
            error: error.message,
        });
    }
};



//delete api 


export const deleteaddress = async (req, res) => {
    try {
       

        const removeAddress = await Address.findByIdAndDelete(
            req.params.id,
           
        );
    
        if(removeAddress){
            return   res.status(201).json({
            status: true,
            message: "Address deleted successfully",
            address: removeAddress,
        });
        }else{
              res.status(400).json({
            status: false,
            message: "not delete",
          
        });
        }
      
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error creating address",
            error: error.message,
        });
    }
};

export default {address,getaddress,updateaddress,deleteaddress};