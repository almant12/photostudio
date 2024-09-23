'use server';

import { cookies } from 'next/headers';

export const checkAdminStatus = async () => {
  const cookieStore = cookies();
  const adminToken = cookieStore.get('Authorization');
  return adminToken ? true : false;
};