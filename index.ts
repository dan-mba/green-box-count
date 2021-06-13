import * as core from '@actions/core'
import * as github from '@actions/github'
import getSquaresCount from './lib/calendar'
import outputSvg from './lib/svg'

(async function(){
  const myToken = core.getInput('github-token');
  if (!myToken) {
    console.log('Required parameter "github-token" missing');
    throw new Error('MissingParmErr');
  }

  const myLogin = github.context.actor;
  const count = await getSquaresCount(myLogin, myToken);

  const size = core.getInput('size');
  outputSvg(size ? Number(size) : 200, count);
})()