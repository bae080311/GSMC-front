import instance from "@repo/api/axios";
import { EvidenceType } from "@repo/types/evidences";

export const getPosts = async (type: EvidenceType | null) => {
  return await instance.get(
    `/evidence/current${type === null ? "" : "?type=" + type}`
  );
};
