
const GoogleAuth = () => {
  // useEffect(() => {
  //   supabase.auth.onAuthStateChange(async (event, session) => {
  //     if (event === 'SIGNED_IN' && session?.user && session.user.email) {
  //       handleUserRegistration(session.user.email, session.user.id);
  //     }
  //   });
  // }, []);

  return (
    <div className='items-center justify-center'>
      <p>Please wait, validating Google account</p>
    </div>
  );
};

export default GoogleAuth;
