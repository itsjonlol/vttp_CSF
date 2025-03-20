package vttp.paf.day39.repo;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import vttp.paf.day39.utils.RedisConstants;

@Repository
public class CharacterRepo {
    
    @Autowired
    @Qualifier(RedisConstants.template01)
    private RedisTemplate<String,String> template;

    public void setHash(String redisKey, String mapKey, String value) {
        template.opsForHash().put(redisKey,mapKey, value);
    }
    //update a single key-value pair in a hash (UPDATE)
    //may need to fixate String mapKey and update value directly
    public void updateValue(String redisKey,String mapKey,String value) {
        template.opsForHash().put(redisKey, mapKey,value); //hset c01 email fred@gmail.com
    }

    // Get the list of values from hash ( the rawData ) (READALL)
    public List<Object> getAllValuesFromHash(String redisKey) {
    
        return (List<Object>) template.opsForHash().values(redisKey); //hvals c01
        
    }
    // Retrieve a value for a specific key in a hash (READONE)
    public String getValueFromHash(String redisKey, String mapKey) {
        return (String) template.opsForHash().get(redisKey, mapKey); //hget c01 email
        //hgetall c01
    }

    // Delete a specific mapKey from a hash (DELETE)
    public Boolean deleteKeyFromHash(String redisKey, String mapKey) {//hdel c01 email

        Boolean isDeleted = false;
        Long iFound = template.opsForHash().delete(redisKey, mapKey);
        if (iFound>0) {
            isDeleted = true;
        }
        return isDeleted;
        
    }

    // Check if a mapKey exists in a hash
    public Boolean hasKey(String redisKey, String mapKey) { //hexists c01 email
        return template.opsForHash().hasKey(redisKey, mapKey);
    }

    // Get the size of a hash (number of keys)
    public Integer getHashSize(String redisKey) { //hlen c01
        return template.opsForHash().size(redisKey).intValue();
    }

    // Check if a hash exists
    public Boolean hashExists(String redisKey) {
        return template.hasKey(redisKey);
    }

    //expire a key
    // HSET myHashKey field1 value1
    // EXPIRE myHashKey 10
    //remember to casr int to long
    public void expireKey(String redisKey, Long seconds) {
        Duration expireDuration = Duration.ofSeconds(seconds);
        template.expire(redisKey, expireDuration);
        
    }
    public void addToHashWithTTL(String redisKey, String hashKey, String hashValue, long seconds) {
        // Add value to the hash
        template.opsForHash().put(redisKey, hashKey, hashValue);

        // Set TTL for the key
        template.expire(redisKey, Duration.ofSeconds(seconds));
    }



    // Add multiple key-value pairs to a hash
    public void setMapAll(String redisKey, HashMap<String, String> map) {
        template.opsForHash().putAll(redisKey, map);
    }

    // Retrieve all key-value pairs in a hash
    public Map<Object, Object> getAllFromHash(String redisKey) {
        return template.opsForHash().entries(redisKey);
    }

    
    // Retrieve all keys in a hash
    public Set<Object> getAllKeysFromHash(String redisKey) {
        return template.opsForHash().keys(redisKey); //hkeys c01
    }

    // Retrieve all values in a hash -> already have in a list
    public Set<Object> getAllValues(String redisKey) { //hvals c01
        return (Set<Object>) template.opsForHash().values(redisKey);
    }

    // Increment a numeric value in a hash
    public void incrementHashValue(String redisKey, String mapKey, long delta) {
        template.opsForHash().increment(redisKey, mapKey, delta); //hincrby c01 count 1
    }

    // Increment a floating-point value in a hash
    public void incrementHashValue(String redisKey, String mapKey, double delta) {
        template.opsForHash().increment(redisKey, mapKey, delta);
    }

}
