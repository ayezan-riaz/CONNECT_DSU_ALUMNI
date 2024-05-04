/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {ID, KTIcon, QUERIES} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser} from '../../core/_requests'
import {ILayout, getLayoutFromLocalStorage} from '../../../../../../../_metronic/layout/core'
type Props = {
  id: ID
}

const UserActionsCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

  const deleteItem = useMutation(() => deleteUser(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  return (
    <>
      <div style={{display: 'inline-flex'}}>
        <a
          href='#'
          className='btn btn-light btn-active-light-primary btn-sm'
          onClick={openEditModal}
        >
          Edit
        </a>

        <a
          className='form-check form-check-custom form-check-solid form-check-success form-switch'
          style={{marginLeft: '10px', marginRight: '10px'}}
        >
          <input
            className='form-check-input'
            type='checkbox'
            name='model.app.sidebar.default.minimize.desktop.enabled'
            id='kt_builder_sidebar_minimize_desktop_enabled'
            checked={config.app?.sidebar?.default?.minimize?.desktop?.enabled}
            onChange={() => {
              const con = {...config}
              if (
                con.app &&
                con.app.sidebar &&
                con.app.sidebar.default &&
                con.app.sidebar.default.minimize &&
                con.app.sidebar.default.minimize.desktop
              ) {
                con.app.sidebar.default.minimize.desktop.enabled =
                  !con.app.sidebar.default.minimize.desktop.enabled
                setConfig({...con})
              }
            }}
          />
        </a>

        <a
          href='#'
          className='btn btn-light btn-active-light-primary btn-sm'
          onClick={async () => await deleteItem.mutateAsync()}
        >
          Delete
        </a>
      </div>
    </>
  )
}

export {UserActionsCell}
