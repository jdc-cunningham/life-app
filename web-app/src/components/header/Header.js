import './Header.css';

const Header = (props) => {
  const { activeTab } = props;

  console.log(props);

  console.log(activeTab);

  const getTabTitle = (activeTab) => {
    if (activeTab === 'calorie-counter') {
      return 'Calorie Counter';
    }
  };

  return (
    <div className="App__Header">
      <h2>{getTabTitle(activeTab)}</h2>
    </div>
  );
}

export default Header;
