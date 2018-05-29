const userInfoService = require('../services/user-info')
const userCode = require('../server/codes/user')
module.exports = {

  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  async signIn(ctx) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null,
      code: ''
    }

    let userResult = await userInfoService.signIn(formData)
    console.log(formData, 2411234, userResult)
    if (userResult) {
      if (formData.userName === userResult.name) {
        result.success = true
        result.data = {
          id:userResult.id,
          uname: userResult.name,
          displayname: userResult.nick || userResult.name,
          image:  userResult.detail_info||null,
          isLogIn: true,
          fontSize: 2,
          token: 'abcdefg'
        }
        result.code = 0
      } else {
        result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
        result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
      }
    } else {
      result.code = 'FAIL_USER_NO_EXIST',
        result.message = userCode.FAIL_USER_NO_EXIST
    }

    if (formData.source === 'form' && result.success === true) {
      let session = ctx.session
      session.isLogin = true
      session.userName = userResult.name
      session.userId = userResult.id

      ctx.redirect('/work')
    } else {
      ctx.body = result
    }
  },

  /**
   * 注册操作
   * @param   {obejct} ctx 上下文对象
   */
  async signUp(ctx) {
    console.log(ctx.request.body, 1)
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null
    }

    let validateResult = userInfoService.validatorSignUp(formData)

    if (validateResult.success === false) {
      result = validateResult
      ctx.body = result
      return
    }

    let existOne = await userInfoService.getExistOne(formData)
    console.log(existOne)

    if (existOne) {
      if (existOne.name === formData.userName) {
        result.message = userCode.FAIL_USER_NAME_IS_EXIST
        ctx.body = result
        return
      }
      if (existOne.email === formData.email) {
        result.message = userCode.FAIL_EMAIL_IS_EXIST
        ctx.body = result
        return
      }
    }


    let userResult = await userInfoService.create({
      email: formData.email,
      password: formData.password,
      name: formData.userName,
      nick: formData.nick,
      create_time: new Date().getTime(),
      level: 1,
    })

    console.log(userResult)

    if (userResult && userResult.insertId * 1 > 0) {
      result.success = true
      result.code = 0
    } else {
      result.message = userCode.ERROR_SYS
    }

    ctx.body = result
  },

  /**
   * 获取用户信息
   * @param    {obejct} ctx 上下文对象
   */
  async getLoginUserInfo(ctx) {
    // let session = ctx.session
    // let isLogin = session.isLogin
    // let userName = session.userName
    let formData = ctx.request.body

    let result = {
      success: false,
      message: '',
      data: {},
    }
    // console.log(isLogin,userName)
    // if ( isLogin === true && userName ) {
    if (formData.userName && formData.token) {
      let userInfo = await userInfoService.getUserInfoByUserName(formData.userName)
      console.log(userInfo)
      if (userInfo) {
        // result.data = userInfo
        result.success = true
        result.data = {
          id:userInfo.id,
          uname: userInfo.userName,
          displayname: userInfo.nick || userInfo.userName,
          image: userInfo.detail_info||null,
          isLogIn: true,
          fontSize: 2,
        }
      } else {
        result.message = userCode.FAIL_USER_NO_LOGIN
      }
    } else {
      // TODO
    }

    ctx.body = result
  },

  /**
   * 校验用户是否登录
   * @param  {obejct} ctx 上下文对象
   */
  validateLogin(ctx) {
    let result = {
      success: false,
      message: userCode.FAIL_USER_NO_LOGIN,
      data: null,
      code: 'FAIL_USER_NO_LOGIN',
    }
    let session = ctx.session
    if (session && session.isLogin === true) {
      result.success = true
      result.message = ''
      result.code = ''
    }
    return result
  },

  /**
  * 修改用户个人信息操作
  * @param   {obejct} ctx 上下文对象
  */
  async update(ctx) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null,
      code: ''
    }
    let params = {
      detail_info:formData.detail_info
    }
    if(formData.password){
      params.password=formData.password
    }
    if(formData.nick){
      params.nick=formData.nick
    }
    let userResult = await userInfoService.update(params,formData.id)
    if (userResult) {
      if (formData.userName === userResult.name) {
        result.success = true
        result.code = 0
      } else {
        result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
        result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
      }
    } else {
      result.code = 'FAIL_USER_NO_EXIST',
        result.message = userCode.FAIL_USER_NO_EXIST
    }

    if (formData.source === 'form' && result.success === true) {
      let session = ctx.session
      session.isLogin = true
      session.userName = userResult.name
      session.userId = userResult.id

      ctx.redirect('/work')
    } else {
      ctx.body = result
    }
  },

}
