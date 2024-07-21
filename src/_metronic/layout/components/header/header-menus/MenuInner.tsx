import { MenuItem } from './MenuItem'
import { MenuInnerWithSub } from './MenuInnerWithSub'
import { useIntl } from 'react-intl'
export function MenuInner() {
  const roleId = parseInt(localStorage.getItem('role') || '0', 10);
  const intl = useIntl()
  return (

    <>
      <MenuItem title={intl.formatMessage({ id: 'MENU.DASHBOARD' })} to='/dashboard' />
      {roleId === 2 && ( <MenuInnerWithSub
        title='Account'
        to='/alumni/account'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuItem title='Overview' to='/alumni/account/overview' icon='archive' />
        <MenuItem title='Settings' to='/alumni/account/settings' icon='setting-2' />
        <MenuItem title='Skills' to='/alumni/account/skills' icon='yii' />
        <MenuItem title='Academics' to='/alumni/account/academics' icon='classmates' />
        <MenuItem title='Work' to='/alumni/account/work' icon='badge' />
        <MenuItem title='Survey' to='/alumni/account/survey' icon='information-4' />
        {/* <MenuItem title='User Management' to='/alumni/dsu/usermanagement' icon='information-4' /> */}
      </MenuInnerWithSub>)}

      <MenuInnerWithSub
        title='Job'
        to='/alumni/jobs'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuItem title='Jobs' to='/alumni/dsu/jobs' icon='subtitle' />

        {roleId === 1 && (<MenuItem title='Approve Jobs' to='/alumni/dsu/approvejobs' icon='archive' />)}

      </MenuInnerWithSub>
      <MenuInnerWithSub
        title='Events'
        to='/alumni/events'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuItem title='Event' to='/alumni/dsu/event' icon='note-2' />
        <MenuItem title='News' to='/alumni/dsu/news' icon='note' />
      </MenuInnerWithSub>

      {/* <MenuItem to='/alumni/dsu/association' title='Association' /> */}
      <MenuItem to='/alumni/dsu/card' title='Alumni Card' />

      <MenuItem to='/alumni/dsu/corporate' title='Corporate Partner' />
      {roleId === 1 && (<MenuItem to='/alumni/dsu/directory' title='Alumni Directory' />)}
      <MenuItem to='/alumni/dsu/donation' title='Donations' />
      <MenuItem to='/alumni/dsu/testimonial' title='Testimonial' />

      {/* <MenuInnerWithSub
        title='Account'

        to='/alumni/account'
        fontIcon='bi-person'
        icon='profile-circle'
      >
        <MenuInnerWithSub title='Overview' to='/alumni/account/overview' icon='archive' />
        <MenuInnerWithSub title='Settings' to='/alumni/account/settings' icon='setting-2' />
        <MenuInnerWithSub title='Skills' to='/alumni/account/skills' icon='setting-2' />
        <MenuInnerWithSub title='Academics' to='/alumni/account/academics' icon='setting-2' />
        <MenuInnerWithSub title='Work' to='/alumni/account/work' icon='setting-2' />
        <MenuInnerWithSub title='Survey' to='/alumni/account/survey' icon='setting-2' />
      </MenuInnerWithSub> */}
    </>
  )
}
