import React from 'react'
import {ProfileDetails} from './cards/ProfileDetails'
import {ChangePassword} from './cards/ChangePassword'
import {ChangeProfilePic} from './cards/ChangeProfilePic'
import { AddResume } from './cards/AddResume'
// import {ConnectedAccounts} from './cards/ConnectedAccounts'
// import {EmailPreferences} from './cards/EmailPreferences'
// import {Notifications} from './cards/Notifications'
// import {DeactivateAccount} from './cards/DeactivateAccount'

export function Settings() {
  return (
    <>
      <ProfileDetails />
      <AddResume />
      <ChangePassword />
      <ChangeProfilePic />
      {/* <ConnectedAccounts /> */}
      {/* <EmailPreferences /> */}
      {/* <Notifications /> */}
      {/* <DeactivateAccount /> */}
    </>
  )
}
