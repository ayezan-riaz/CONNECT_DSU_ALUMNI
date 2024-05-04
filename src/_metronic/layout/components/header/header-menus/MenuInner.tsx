import { useIntl } from 'react-intl'
import { MenuItem } from './MenuItem'
import { MenuInnerWithSub } from './MenuInnerWithSub'
import { MegaMenu } from './MegaMenu'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({ id: 'MENU.DASHBOARD' })} to='/dashboard' />
      <MenuInnerWithSub
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
      </MenuInnerWithSub>




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
