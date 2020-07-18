import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../constants';
import './styles.scss';
import PeopleIcon from '../../icons/PeopleIcon';
import StarIcon from '../../icons/StarIcon';
import OrganizationIcon from '../../icons/OrganizationIcon';
import LocationIcon from '../../icons/LocationIcon';
import EmailIcon from '../../icons/EmailIcon';
import { useDispatch } from 'react-redux';
import { AppDispatcher } from '../../action';

interface Props {
  userName: string
}
const MyProfile: React.FC<Props> = (props) => {
  const { userName } = props;
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const appDispatcher = new AppDispatcher(dispatch);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = () => {
    setIsLoading(true);
    fetch(`${BASE_URL}/users/${userName}`)
    .then(res => res)
    .then(res => res.json())
    .then(data => {
      setProfileData(data);
      setIsLoading(false);
    })
    .catch(err => appDispatcher.triggerNotFound())
  }

  return (
    <div className="myProfileContainer">
      { !isLoading && profileData &&
        <div>
          <div className="imgNameWrap">
            <img className="profileImg" src={profileData.avatar_url} />
            <div className="nameWrap">
              <h3 className="primary">{profileData.name}</h3>
              <span className="userName">{profileData.login}</span>
            </div>
          </div>
          <div className="aboutWrap">
            <p className="bio">{profileData.bio}</p>
            <button className="btn followBtn">Follow</button>
            <div className="popularityInfo">
              <a className="popularityItem" href={profileData.followers_url}><PeopleIcon /><strong>{profileData.followers}</strong> followers ·</a>
              <a className="popularityItem" href={profileData.following_url}><strong>{profileData.following}</strong> following</a>
            </div>
            <ul className="extraInfoList">
                {profileData.company && <li className="extraInfoItem"><OrganizationIcon />{profileData.company}</li>}
                {profileData.location && <li className="extraInfoItem"><LocationIcon />{profileData.location}</li>}
                {profileData.email && <li className="extraInfoItem"><EmailIcon />{profileData.email}</li>}
              </ul> 
          </div>
        </div>
      }
      { isLoading &&
        <div>

        </div>
      }
    </div>
  )
}

export default MyProfile;