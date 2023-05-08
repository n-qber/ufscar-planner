import React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import GenericLogin from "../../components/GenericLogin";
import Toast from "react-native-toast-message";
import { Buffer } from "buffer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import { UserState } from "../../redux/types/user";
import { updateUser } from "../../redux/actions/userActions";
import { BalanceErr, tryGetBalance } from "../../helpers/balance";

export default function RUSyncScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const user = useSelector<RootState, UserState>((state) => state.user).user;
  const dispatch = useDispatch();

  async function login(
    uname: string,
    password: string,
    _errorHandler: (error: Response) => void, // TODO refatorar isso fora.
    setErrorMessage: (msg: string) => void,
    // setMessageS: (msg: string) => void, // TODO refatorar isso fora.
  ) {
    const encodedAuth = Buffer.from(uname + ":" + password).toString("base64");
    const newUser = { ...user, balanceSyncToken: encodedAuth };
    const balance = await tryGetBalance(newUser);

    // Só queremos saber se o usuário e a senha são válidos.
    if (typeof balance === "number") {
      newUser.money = balance;
      dispatch(updateUser(newUser));
      Toast.show({ text1: "A sincronização de saldo foi ativada." });
      navigation.goBack();
    } else if (balance == BalanceErr.AUTH_FAILED) {
      setErrorMessage("Usuário ou senha inválidos");
    } else {
      setErrorMessage("Aconteceu um problema na comunicação com o Sagui");
    }
  }

  const styles = StyleSheet.create({
    title: {
      color: theme.colors.onSurfaceVariant,
      fontWeight: "bold",
      fontSize: 30,
      marginTop: 20,
    },
    description: {
      padding: 20,
      textAlign: "justify",
      color: theme.colors.onSurface,
      width: "100%",
    },
  });

  return (
    <GenericLogin
      Authenticate={login}
      SubmitText="Ativar Sincronização"
      WarningText=
        "Suas credenciais serão armazenadas e seu saldo será alterado!"
    >
      <Text style={styles.title}>
        Carteirinha do RU
      </Text>
      <Text style={{ ...styles.description, paddingBottom: 0 }}>
        Sincronize usando as mesmas credenciais que você utiliza ao entrar no
        SIGA.
      </Text>
      <Text style={{ ...styles.description, paddingTop: 0 }}>
        Suas credenciais serão armazenadas e o seu saldo será consultado
        periodicamente usando os servidores do Sagui.
      </Text>
    </GenericLogin>
  );
}
