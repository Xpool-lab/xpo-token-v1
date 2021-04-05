import {task} from 'hardhat/config';
import {eContractid} from '../../helpers/types';
import {
  registerContractInJsonDb,
  deployXpoolTokenV1,
} from '../../helpers/contracts-helpers';

const {XpoolTokenV1} = eContractid;

task(`deploy-xpoolTokenV1`, `Deploys the Xpool contract`)
  .addFlag('verify', 'Proceed with the Etherscan verification')
  .setAction(async ({verify}, localBRE) => {
    await localBRE.run('set-dre');

    if (!localBRE.network.config.chainId) {
      throw new Error('INVALID_CHAIN_ID');
    }

    console.log(`\n- Xpool - XPO Token deployment`);
    const xpoolToken = await deployXpoolTokenV1(verify);
    await registerContractInJsonDb(XpoolTokenV1, xpoolToken);

    console.log(`\tFinished Xpool proxy and implementation deployment`);
  });
