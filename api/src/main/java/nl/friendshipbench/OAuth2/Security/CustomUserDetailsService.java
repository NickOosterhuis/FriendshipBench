package nl.friendshipbench.oauth2.security;

import nl.friendshipbench.api.models.User;
import nl.friendshipbench.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Makes use of the UserRepository to retreive User Information from the database
 *
 * @author Nick Oosterhuis
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null)
            throw new UsernameNotFoundException("Username "+ username + " not found");

        return new CustomUserDetails(user);
    }
}