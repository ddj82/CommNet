package com.ex.commnetbe.Repository;


import com.ex.commnetbe.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
//@NoRepositoryBean
public interface UserRepository extends JpaRepository<UserEntity, String> {
    public boolean existsByEmailAndPassword(String email, String password);
}
