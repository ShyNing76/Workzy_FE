import axios from "./axios.customize";

  const getWorkspaceType = (workspace, workspace_type_id, workspace_type_name, image, description, status) => {
    const URL_API = "/api/v1/workspace-type"
    const data = {
        workspace_type_id,
        workspace_type_name,
        image,
        description,
        status,
    }
}

    

  export {
    getWorkspaceType,

  };