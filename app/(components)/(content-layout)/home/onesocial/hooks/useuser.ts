

import { useEffect, useState } from 'react';

interface User {
  id: string;
  displayName: string;
  avatarUrl?: string;
  // Diğer kullanıcı özellikleri...
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Kullanıcı bilgilerini getir
    // Örneğin localStorage'dan veya API'den
    const userData = user?.id
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return { user };
};