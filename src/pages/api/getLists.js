// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    chicago: {
      name: 'Chicago',
      subtitle: 'All Time Faves',
      amount: '8',
      slug: 'chicago',
      img: '/lists/chi.png',
    },


   })
}
