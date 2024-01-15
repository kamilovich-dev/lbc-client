import {createContext} from "react";
import { SessionStore } from 'entities/session';

const SessionStoreContext = createContext<SessionStore | null>(null);

export { SessionStoreContext }