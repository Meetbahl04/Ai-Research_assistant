"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getWorkspaces,
} from "../services/workspace";

interface Workspace {
  id: string;
  name: string;
  createdAt: string;
}

interface WorkspaceContextType {
  workspaces: Workspace[];
  setWorkspaces: React.Dispatch<
    React.SetStateAction<Workspace[]>
  >;
}

const WorkspaceContext =
  createContext<
    WorkspaceContextType | undefined
  >(undefined);

export const WorkspaceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [workspaces,
    setWorkspaces] =
    useState<Workspace[]>([]);

  useEffect(() => {

    const loadWorkspaces =
      async () => {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) return;

        try {

          const data =
            await getWorkspaces(
              token
            );

          setWorkspaces(
            data.data
          );

        } catch (error) {

          console.log(error);
        }
      };

    loadWorkspaces();

  }, []);

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        setWorkspaces,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspaces =
  () => {

    const context =
      useContext(
        WorkspaceContext
      );

    if (!context) {
      throw new Error(
        "useWorkspaces must be used inside WorkspaceProvider"
      );
    }

    return context;
  };