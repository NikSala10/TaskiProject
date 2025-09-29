import CardPoint from "../../components/CardPoints/CardPoint";
import { useSetPageInfo } from "../../hook/UseSetPage";
import RabitIcon from "../../assets/Conejo.png";
import ViperIcon from "../../assets/Serpiente.png";
import WinnerIcon from "../../assets/trophy.png";

const winners = () => {
  useSetPageInfo("Groups");

  return (
    <>
    <div className="header-group">
      <h1>The cycle has ended and we reveal the lucky winners</h1>
      <p>The prize will be divided as follows: 50% for first place, 30% for second place, and 20% for third place.</p>
      <div className="winner-icon-container">
        <img src={WinnerIcon} alt="Winner Trophy" className="winner-icon" />
      </div>
    </div>  

    <div className="ranking-page">
      <CardPoint position={1} name="Squirrel" points={140} icon={ViperIcon}  />
      <CardPoint position={2} name="Nunu" points={110} icon={RabitIcon} />
      <CardPoint position={3} name="Viper" points={107} icon={ViperIcon}  />
    </div>
    </>

  );
};

export default winners;