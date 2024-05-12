import userService from '../services/userService';

let handleLoging = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    //check email exist
    //password nhap vao ko dung
    //return userInfor
    // access_token :JWT json web token

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //All, id
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        message: "Missing required parameters",
        users: [],
      });
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
      errCode: 0,
      message: "ok",
      users,
    });
  };
  
  let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
  };
  let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.udateUserData(data);
    return res.status(200).json(message);
  };
  
  let handleDeleteUser = async (req, res) => {
    let id = req.body.id;
    if (!id) {
      return res.status(500).json({
        errCode: 1,
        errMessage: "Missing required parameters!",
      });
    }
    if (id) {
      let message = await userService.deleteUser(id);
      return res.status(200).json(message);
    }
  };

module.exports = {
    handleLoging: handleLoging,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser

    
}
