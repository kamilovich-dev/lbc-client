import styles from './styles.module.css'

interface IProps {
    children: JSX.Element,
}

const UserProfileLayout =  ({ children }: IProps) => {
    return (
        <div className={styles.outerLayout}>
            <div className={styles.innerLayout}>{children}</div>
        </div>
    );
};

export { UserProfileLayout };