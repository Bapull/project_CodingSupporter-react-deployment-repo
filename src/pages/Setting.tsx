import '../styles/setting.css';
import AccountSettings from '../settings/AccountSettings';
import ContactInfo from '../settings/ContactInfo';
import Help from '../settings/Help';
import PrivacyPolicy from '../settings/PrivacyPolicy';
import VersionInfo from '../settings/VersionInfo';

function Setting() {
  return (
    <div className="setting">
      <div className="container">
        <AccountSettings />
        <ContactInfo />
        <Help />
        <PrivacyPolicy />
        <VersionInfo />
      </div>
    </div>
  );
}

export default Setting;
