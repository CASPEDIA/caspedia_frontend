import React, { useEffect, useRef, useState } from 'react'
import './AdminPage.css'
import UserItem from './UserItem'
import { getUsers } from 'hooks/adminHooks';
import CustomButton from 'components/common/CustomButton';
import { useNavigate } from 'react-router-dom';
import CommonModal from 'components/modal/CommonModal';

export default function AdminPage() {
  const [userList, setUserList] = useState([]);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const navigate = useNavigate();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const userModalRef = useRef(null);
  const [currentUser, setCurrentUser] = useState({});
  
  const openUserModal = () => {
    setIsUserModalOpen(true);
    if(userModalRef.current) {
      userModalRef.current.handleResize();
    }
  }

  const closeUserModal = () => { 
    setIsUserModalOpen(false); 
    setCurrentUser({
      nanoid: '',
      id: '',
      nickname: '',
      name: '',
      introduction: '',
      studentId: 0,
      userImageKey: 1,
      enabled: true,
      authorityKey: 2,
    });
  }

  const handleModifyUserModal = ( userData ) => {
    console.log("hello");
    setIsCreateMode(false);
    openUserModal();
    setCurrentUser(userData);
  }

  const handleCreateUserModal = () => {
    setIsCreateMode(true);
    openUserModal();
  }

  useEffect(() => {
    getUsers()
      .then((data) => {
        const parsedData = data.map((item) => ({
          nanoid: item.nanoid,
          id: item.id,
          nickname: item.nickname,
          name: item.name,
          introduction: item.introduction,
          studentId: item.student_id,
          userImageKey: item.user_image_key,
          enabled: item.enabled,
          authorityKey: item.authority_key
        }));
        setUserList(parsedData);
      })
      .catch((e) => {
        console.log(e);
      })
  }, [])
  return (
    <div className='div-admin-user-list'>
      <table className='table-user-list'>
        <thead>
          <tr>
            <th>
              <CustomButton
                onClick={() => handleCreateUserModal()}
                text='신규 유저'
              />
            </th>
            <th className='wide-column'>이름</th>
            <th>닉네임</th>
            <th>권한</th>
            <th>사용 여부</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((item,index) => {
            return (
              <UserItem 
                key={index}
                clickEvent={() => {handleModifyUserModal(userList[index])}}
                nanoid={item.nanoid}
                id={item.id}
                nickname={item.nickname}
                name={item.name}
                introduction={item.introduction}
                studentId={item.studentId}
                userImageKey={item.userImageKey}
                enabled={item.enabled}
                authorityKey={item.authorityKey}
              />
            )
          })}
        </tbody>
      </table>
      <CommonModal
        isModalOpen={isUserModalOpen}
        closeModal={closeUserModal}
        ref={userModalRef}
        option="hidden"
      >
        <div>
          hello {isCreateMode ? "create" : "modify"}
        </div>
      </CommonModal>
    </div>
  )
}
