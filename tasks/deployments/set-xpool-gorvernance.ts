import {task} from 'hardhat/config';
import {eContractid} from '../../helpers/types';
import {
  getXpoolTokenV1,
  getContract,
} from '../../helpers/contracts-helpers';
import {waitForTx} from '../../helpers/misc-utils';
import {XPO_GORVERNANCE} from '../../helpers/constants';
import {InitializableAdminUpgradeabilityProxy} from '../../types/InitializableAdminUpgradeabilityProxy';
const {XpoolTokenV1} = eContractid;

task(`add-gorvernace`, `Set Xpool gorvernance`)
  .setAction(async ({onlyProxy}, localBRE) => {
    await localBRE.run('set-dre');

    if (!localBRE.network.config.chainId) {
      throw new Error('INVALID_CHAIN_ID');
    }

    console.log(`\n- Xpool set gorvernance`);
    const xpoolToken = await getXpoolTokenV1();
    const abc2 = await xpoolToken.setNewGorvernance(XPO_GORVERNANCE)
    console.log('\tFinished set XPO Token gorvernance');
  });
