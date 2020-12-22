import {RealmContext} from 'core/contexts';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import Realm from 'realm';

export default function RealmProvider({schemas, ...props}) {
  const [realmInstance, setRealmInstance] = useState(null);

  useEffect(() => {
    async function initializeRealm() {
      const realm = await Realm.open({
        schema: Array.isArray(schemas) ? schemas : [schemas],
      });

      setRealmInstance(realm);
    }

    initializeRealm();
  }, [setRealmInstance, schemas]);

  if (!realmInstance) {
    return (
      <View flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <RealmContext.Provider {...props} value={realmInstance} />;
}
