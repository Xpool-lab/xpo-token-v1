import {task} from 'hardhat/config';
import {eContractid} from '../../helpers/types';
import {
  getXpoolTokenV1,
} from '../../helpers/contracts-helpers';
import { ZERO_ADDRESS } from '../../helpers/constants';
const {XpoolTokenV1} = eContractid;

task(`initialize-xpool`, `Initialize the Xpool proxy contract`)
  .addFlag('onlyProxy', 'Initialize only the proxy contract, not the implementation contract')
  .setAction(async ({onlyProxy}, localBRE) => {
    await localBRE.run('set-dre');

    if (!localBRE.network.config.chainId) {
      throw new Error('INVALID_CHAIN_ID');
    }

    console.log(`\n- Xpool initialization`);

    const xpoolToken = await getXpoolTokenV1();
    await xpoolToken.initialize(ZERO_ADDRESS)
    
    console.log('\tFinished Xpool Token and Transparent Proxy initialization');
  });
