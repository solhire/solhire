import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export class UploadService {
  /**
   * Upload a file to Firebase Storage
   * @param file The file to upload
   * @param path The path in storage (e.g., 'profiles', 'portfolio')
   * @param maxSizeMB Maximum file size in MB
   * @returns Promise with the download URL
   */
  static async uploadFile(file: File, path: string, maxSizeMB: number = 5): Promise<string> {
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      throw new Error(`File size exceeds the maximum limit of ${maxSizeMB}MB`);
    }

    // Create a unique filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const storageRef = ref(storage, `${path}/${fileName}`);

    // Upload the file
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Return a promise that resolves with the download URL
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress monitoring if needed
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle errors
          reject(error);
        },
        async () => {
          // Upload completed successfully, get the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  }

  /**
   * Delete a file from Firebase Storage
   * @param fileUrl The full URL of the file to delete
   * @returns Promise that resolves when the file is deleted
   */
  static async deleteFile(fileUrl: string): Promise<void> {
    try {
      // Extract the path from the URL
      const fileRef = ref(storage, fileUrl);
      await deleteObject(fileRef);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
} 