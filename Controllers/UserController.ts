export async function getServerSideProps({ req }) {
  const session = req.cookies.session
    ? JSON.parse(req.cookies.session)
    : null

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: session,
    },
  }
}