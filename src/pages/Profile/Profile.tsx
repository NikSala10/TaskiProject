import AvatarWithName from "../../components/AvatarWithName/AvatarWithName";
import User from "../../components/UserProfile/User";
import "./profile.css";

const Profile = () => {

  return (
    <div className="container-profile">
        <div className="user-profile">
            <User />
        </div>
        <div className="header-profile">
            <div className="info-user-profile">
                <div className="img-profile">
                    <svg width="120" height="120" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.3154 0.133352C31.6512 -1.59976 42.8366 13.8842 35.7331 27.7377C28.6297 41.5912 9.01813 41.2491 2.08569 27.7377C-3.80917 16.2444 3.37412 1.59281 16.3154 0.133352ZM31.8222 23.9978C31.9134 23.4505 31.7538 23.0173 31.5828 22.5156C30.6592 19.7905 28.6183 16.5523 26.6571 14.5113C26.3378 14.1693 26.1668 12.7896 25.095 13.0177C24.6389 13.1089 24.5591 13.8956 23.5215 13.8956C20.5798 13.9184 18.5731 11.8889 15.3577 13.3597C11.481 15.1156 13.4991 20.0869 10.4092 22.9146C9.17776 24.0434 5.05022 24.8188 5.03882 25.1038C5.01601 26.187 8.91552 25.3319 9.65665 25.0012C11.5722 24.1689 12.6326 21.8657 13.3851 21.478C13.8868 21.2157 13.807 21.706 13.8868 21.9113C14.8674 24.4083 16.5777 29.7217 16.6917 23.0515C18.1968 24.0434 22.3357 21.706 23.5671 22.47C23.7496 22.584 25.0494 26.6431 26.1326 25.5713C26.4747 25.2407 24.8556 22.1621 25.1862 21.7972C25.9388 21.9113 26.6343 21.1929 27.2614 21.1587C28.8463 21.0561 30.1461 23.9408 31.7994 23.9978H31.8222Z" fill="#365EA9"/>
                        <path d="M31.822 23.9981C30.1687 23.941 28.8689 21.0563 27.284 21.159C26.6569 21.1932 25.9613 21.9115 25.2088 21.7975C24.8781 22.1623 26.4858 25.2409 26.1552 25.5715C25.0606 26.6433 23.7721 22.5842 23.5897 22.4702C22.3469 21.6948 18.2079 24.0323 16.7143 23.0517C16.6003 29.7219 14.8785 24.4085 13.9094 21.9115C13.8296 21.7062 13.9094 21.216 13.4077 21.4782C12.6551 21.8659 11.5948 24.1691 9.67921 25.0014C8.93808 25.3207 5.03857 26.1758 5.06138 25.1041C5.06138 24.8076 9.20032 24.0323 10.4317 22.9149C13.5217 20.0986 11.5035 15.1273 15.3802 13.3599C18.607 11.8891 20.6024 13.9186 23.5441 13.8958C24.5817 13.8958 24.6615 13.1091 25.1176 13.0179C26.2008 12.7898 26.3604 14.1695 26.6797 14.5116C28.6408 16.5525 30.6704 19.7907 31.6053 22.5158C31.7764 23.0175 31.9474 23.4508 31.8448 23.9981H31.822Z" fill="#F9FBFE"/>
                    </svg>
                    <div className="change-img-profile">

                    </div>
                </div>
                
                <div className="info-profile">
                    <span className="name-profile" >Luli</span>
                    <span className="role-profile">Administrador</span>
                </div>
            </div>
            <div className="btn-profile">
                <button className="btn-cp-profile">Change Password</button>
            </div>
        </div>
        <div className="tasks-summary">
            <div className=" tasks completed-tasks">
                <p className="task-num">12</p>
                <p>Completed tasks</p>
            </div>
            <div className="tasks pending-tasks">
                <p className="task-num">6</p>
                <p>Pending tasks</p>
            </div>
        </div>
        <div className="subcontainer-profile">
            <div className="square-points">
                <div className="trophy-img">
                    <p></p>
                </div>
                <p className="num-points">140</p>
                <p>Points</p>
            </div>

            <AvatarWithName avatar={<img src="https://i.pravatar.cc/150?img=3" alt="avatar" />} namePlayer="Nuni" rol="Member" showRanking={false} numPoints={0}/>
            <AvatarWithName avatar={<img src="https://i.pravatar.cc/150?img=5" alt="avatar" />} namePlayer="Jui" rol="Member" showRanking={false} numPoints={0}/>
            <AvatarWithName avatar={<img src="https://i.pravatar.cc/150?img=7" alt="avatar" />} namePlayer="Patiks" rol="Member" showRanking={false} numPoints={0}/>
        </div>
            
    </div>


    
  );
};

export default Profile;