import React, { useEffect, useRef, useState } from 'react'
import './AdminPage.css'
import UserItem from './UserItem'
import { addUserByAdmin, getUsers, resetPassword, setUserByAdmin } from 'hooks/adminHooks';
import CustomButton from 'components/common/CustomButton';
import { useNavigate } from 'react-router-dom';
import CommonModal from 'components/modal/CommonModal';
import CancelButton from 'components/common/CancelButton';
import { checkMyNewNickname } from 'hooks/userHooks';

export default function AdminPage() {
  const [userList, setUserList] = useState([]);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const navigate = useNavigate();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const userModalRef = useRef(null);
  const [curNanoid, setCurNanoid] = useState('');
  const [curId, setCurId] = useState('');
  const [curNickname, setCurNickname] = useState('');
  const [curName, setCurName] = useState('');
  const [curIntroduction, setCurIntroduction] = useState('');
  const [curStudentId, setCurStudentId] = useState(0);
  const [curUserImageKey, setCurUserImageKey] = useState(1);
  const [curEnabled, setCurEnabled] = useState(true);
  const [curAuthorityKey, setCurAuthorityKey] = useState(2);

  const [newNicknameMessage, setNewNicknameMessage] = useState('');
  const [newNicknameClassname, setNewNicknameClassname] = useState('');

  const handleNanoidChange = (e) => setCurNanoid(e.target.value);
  const handleIdChange = (e) => setCurId(e.target.value);

  
  const handleNameChange = (e) => setCurName(e.target.value);
  const handleIntroductionChange = (e) => setCurIntroduction(e.target.value);
  const handleStudentIdChange = (e) => setCurStudentId(Number(e.target.value)); // 숫자 변환
  const handleUserImageKeyChange = (e) => setCurUserImageKey(Number(e.target.value)); // 숫자 변환
  const handleEnabledChange = (e) => setCurEnabled(e.target.checked); // 체크박스 값
  const handleAuthorityKeyChange = (e) => setCurAuthorityKey(Number(e.target.value)); // 숫자 변환

  
  const openUserModal = () => {
    setIsUserModalOpen(true);
    if(userModalRef.current) {
      userModalRef.current.handleResize();
    }
  }

  const setCurrentUser = (data) => {
    if (data) {
      setCurNanoid(data.nanoid);
      setCurId(data.id);
      setCurNickname(data.nickname);
      setCurName(data.name);
      setCurIntroduction(data.introduction);
      setCurStudentId(data.studentId);
      setCurUserImageKey(data.userImageKey);
      setCurEnabled(data.enabled);
      setCurAuthorityKey(data.authorityKey);
    } else {
      setCurNanoid('');
      setCurId('');
      setCurNickname('');
      setCurName('');
      setCurIntroduction('');
      setCurStudentId(1);
      setCurUserImageKey(1);
      setCurEnabled(true);
      setCurAuthorityKey(2);
      setNewNicknameMessage("");
    }
  }

  const closeUserModal = () => { 
    setIsUserModalOpen(false); 
    setCurrentUser(null);
  }
  
  const handleModifyUserModal = ( userData ) => {
    setIsCreateMode(false);
    openUserModal();
    setCurrentUser(userData);
  }
  
  const handleCreateUserModal = () => {
    setIsCreateMode(true);
    openUserModal();
  }
  
  const checkValidateNickname = (newState) => {
    const basePattern = /^[가-힣a-zA-Z0-9_.]+$/;
  
    // 기본 패턴 확인
    if (!basePattern.test(newState)) {
      setNewNicknameClassname('div-nickname-wrong');
      setNewNicknameMessage("닉네임에 허용되지 않는 문자가 포함되어 있습니다.");
      return false;
    }
  
    // 가중치 계산: 한글은 2, 영어는 1로 설정
    let weightedLength = 0;
    for (const char of newState) {
      if (/[가-힣]/.test(char)) {
        weightedLength += 2; // 한글은 2
      } else if (/[a-zA-Z]/.test(char)) {
        weightedLength += 1; // 영어는 1
      } else {
        weightedLength += 1; // 숫자, '_', '.'는 1로 계산
      }
    }
  
    // 길이 조건 확인
    if (weightedLength > 20) {
      setNewNicknameClassname('div-nickname-wrong');
      setNewNicknameMessage("닉네임의 가중치 합이 20을 초과할 수 없습니다.");
      return false;
    }
    
    return true;
  };

  const handleNicknameChange = (e) => {
    const newState = e.target.value;
    setCurNickname(newState);
    if(checkValidateNickname(newState)){
      checkMyNewNickname(newState)
        .then((data) => {
          // setNickname(newState);
          setNewNicknameClassname('div-nickname-confirm');
          setNewNicknameMessage("사용 가능한 닉네임입니다.");
        })
        .catch((e) => {
          if (e.response && e.response.status === 400) {
            setNewNicknameClassname('div-nickname-wrong');
            setNewNicknameMessage(e.response.data.message);
          }
        });
    }
  }

  const handlePasswordReset = (nanoid) => {
    resetPassword(nanoid)
      .then((data) => {
        closeUserModal();
      })
      .catch((e) => {
        console.log(e);
      })
  }

  const reloadUserLists = () => {
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
  }

  const handleUserCreate = () => {
    const userData = {
      "id": curId,
      "name": curName,
      "studentId": curStudentId,
      "enabled": curEnabled,
      "authorityKey": curAuthorityKey,
    };
    addUserByAdmin(userData)
      .then((data) => {
        reloadUserLists();
        closeUserModal();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleUserModify = () => {
    const userData = {
      "nanoid": curNanoid,
      "nickname": curNickname,
      "introduction": curIntroduction,
      "enabled": curEnabled,
      "authorityKey": curAuthorityKey,
    }
    setUserByAdmin(userData)
      .then((data) => {
        closeUserModal();
        reloadUserLists();
      })
      .catch((e) => {
        console.log(e);
      })
  }

  useEffect(() => {
    reloadUserLists();
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
            <th>학번</th>
            <th>닉네임</th>
            <th>권한</th>
            <th>활성화</th>
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
        <table style={{"width" : "100%"}}>
          <tbody>
            <tr>
              <td>이름</td>
              <td>
              <input
                type="text"
                className='input-user'
                // placeholder=""
                value={curName}
                onChange={handleNameChange}
                autoComplete='off'
                disabled={!isCreateMode}
                />
              </td>
            </tr>
            <tr>
              <td>학번</td>
              <td>
              <input
                type="number"
                className='input-user'
                // placeholder=""
                value={curStudentId}
                onChange={handleStudentIdChange}
                autoComplete='off'
                disabled={!isCreateMode}
                />
              </td>
            </tr>
            <tr>
              <td>아이디</td>
              <td>
              <input
                type="text"
                className='input-user'
                // placeholder=""
                value={curId}
                onChange={handleIdChange}
                autoComplete='off'
                disabled={!isCreateMode}
                />
              </td>
            </tr>
            {!isCreateMode ?
            <tr>
              <td>닉네임</td>
              <td>
              <input
                type="text"
                className='input-user'
                // placeholder=""
                value={curNickname}
                onChange={handleNicknameChange}
                autoComplete='off'
                />
              </td>
            </tr>
            :
            <></>
            }
            <tr>
              <td></td>
              <td>
                <div className={`div-new-nickname-message ${newNicknameClassname}`}>{newNicknameMessage}</div>
              </td>
            </tr>
            {!isCreateMode ?
            <tr>
              <td>자기소개</td>
              <td>
                <textarea 
                  value={curIntroduction} 
                  onChange={handleIntroductionChange}
                  rows="5"
                  placeholder="자기소개를 입력하세요."
                  className='custom-textarea'
                  maxLength="299"
                />  
              </td>
            </tr>
            :
            <></>
            }
            <tr>
              <td>권한</td>
              <td>
                <select 
                  className='select-custom'
                  value={curAuthorityKey} 
                  onChange={handleAuthorityKeyChange}
                  >
                  <option value="1">관리자</option>
                  <option value="2">사용자</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>사용 여부</td>
              <td>
                <select 
                  className='select-custom'
                  value={curEnabled} 
                  onChange={handleEnabledChange}
                >
                  <option value="true">V</option>
                  <option value="false">X</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
          {isCreateMode ?
            <div className='div-new-user'>
              <CustomButton 
                onClick={() => handleUserCreate()}
                text='신규 유저 생성'
                />
            </div>
            :
            <div>
              <div className='div-modify-user'>
                <CancelButton
                  onClick={() => handlePasswordReset(curNanoid)}
                  text='비밀번호 초기화'
                  />
                <CustomButton
                  onClick={() => handleUserModify()}
                  text='유저 수정'
                />
              </div>
            </div>
          }
      </CommonModal>
    </div>
  )
}
