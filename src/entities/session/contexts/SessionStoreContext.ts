import {createContext} from "react";
import { ISessionStore } from 'entities/session/model/types';

const SessionStoreContext = createContext<ISessionStore | null>(null);

export { SessionStoreContext }