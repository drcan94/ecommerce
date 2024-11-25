import React, { type ReactNode } from "react";
import { Nav } from "@/app/(example)/_components/Nav";
import styles from "@/app/(example)/_components/styles/layout.module.css";
import Image from "next/image";

interface Props {
  readonly children: ReactNode;
}

export default function ExampleLayout({ children }: Props) {
  return (
    <div className={styles.container}>
      <Nav />

      <div className={styles.header}>
        <Image
          src="/logo.svg"
          className={styles.logo}
          alt="logo"
          width={100}
          height={100}
        />
      </div>

      <div className={styles.main}>{children}</div>

      <div className={styles.footer}>
        <span>Learn </span>
        <a
          className={styles.link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </a>
        <span>, </span>
        <a
          className={styles.link}
          href="https://redux.js.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Redux
        </a>
        <span>, </span>
        <a
          className={styles.link}
          href="https://redux-toolkit.js.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Redux Toolkit
        </a>
        <span>, </span>
        <a
          className={styles.link}
          href="https://react-redux.js.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React Redux
        </a>
        ,<span> and </span>
        <a
          className={styles.link}
          href="https://reselect.js.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reselect
        </a>
      </div>
    </div>
  );
}
