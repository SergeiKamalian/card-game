import { memo } from 'react';
import { UserProvider } from '../../contexts';


const ProfileComponent = memo(() => {
    return (
        <div>PROFILE</div>
    );
});

export const Profile = memo(() => {
    return (
        // <UserProvider>
            <ProfileComponent />
        // </UserProvider>
    )
})