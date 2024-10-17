import { useState } from 'react';
import '../styles/settings.css';
import AccountSettings from '../settings/AccountSettings';
import Notification from '../settings/Notification';
import ContactInfo from '../settings/ContactInfo';
import Help from '../settings/Help';
import PrivacyPolicy from '../settings/PrivacyPolicy';
import VersionInfo from '../settings/VersionInfo';

function Settings() {
  const [selectedMenu, setSelectedMenu] = useState('account');

  const handleMenuClick = () => {
    switch (selectedMenu) {
      case 'account':
        return <AccountSettings />;
      case 'notification':
        return <Notification />;
      case 'contact':
        return <ContactInfo />;
      case 'help':
        return <Help />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'version':
        return <VersionInfo />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="settings">
      <div className="setting-container">
        <div className="setting-sidebar">
          <ul>
            <li onClick={() => setSelectedMenu('account')} className={selectedMenu === 'account' ? 'active' : ''}>
              Information
            </li>
            <li
              onClick={() => setSelectedMenu('notification')}
              className={selectedMenu === 'notification' ? 'active' : ''}
            >
              Notification
            </li>
            <li onClick={() => setSelectedMenu('contact')} className={selectedMenu === 'contact' ? 'active' : ''}>
              Contact Us
            </li>
            <li onClick={() => setSelectedMenu('help')} className={selectedMenu === 'help' ? 'active' : ''}>
              Help
            </li>
            <li onClick={() => setSelectedMenu('privacy')} className={selectedMenu === 'privacy' ? 'active' : ''}>
              Privacy Policy
            </li>
            <li onClick={() => setSelectedMenu('version')} className={selectedMenu === 'version' ? 'active' : ''}>
              Version
            </li>
          </ul>
        </div>

        <div className="setting-content">{handleMenuClick()}</div>
      </div>
    </div>
  );
}

export default Settings;
