
import dotenv from 'dotenv'
import getSquaresCount from '../lib/calendar'
import outputSvg from '../lib/svg'

dotenv.config();

(async function(){
  const count = await getSquaresCount(process.env.USERID!, process.env.GITHUB_TOKEN!)
  outputSvg(200, count);
})()