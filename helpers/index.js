const axios = require("axios")
const { userProfilesUrl, usersUrl } = require("../config")

const validAge = 10

const determineIsValid = (users, name) => {
  const user = users.find((user) => user.username === name)
  if (user) {
    const isOldEnough = determineAge(user.birthdate)
    if (isOldEnough) {
      return "pass"
    } else {
      return "too old"
    }
  }

  return "no user exists"
}

const determineAge = (birthdate) => {
  let splitBday = birthdate.split("/")
  splitBday = `${splitBday[0]}/${splitBday[2]}/${splitBday[1]}`
  const today = new Date()
  const birthdateDate = new Date(splitBday)
  let age = today.getFullYear() - birthdateDate.getFullYear()
  const month = today.getMonth() - birthdateDate.getMonth()
  if (month < 0 || (month === 0 && today.getDate() < birthdateDate.getDate())) {
    age--
  }
  if (age <= validAge) {
    return true
  }
  return false
}

const combineUsers = async () => {
  const users = await getInfo(usersUrl)
  const userProfiles = await getInfo(userProfilesUrl)
  if (users.data && userProfiles.data) {
    const combinedUsers = users.data.map((user) => {
      const userProfile = userProfiles.data.find(
        (userProfile) => userProfile.userUid === user.uid
      )
      return { ...user, ...userProfile }
    })
    return combinedUsers
  }
}

const getInfo = async (url) => {
  try {
    const result = await axios.get(url)
    return result
  } catch (error) {
    console.log("error:", error)
    return error
  }
}

module.exports = { combineUsers, determineIsValid }
