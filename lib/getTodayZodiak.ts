import fs from 'fs'; 
import path from 'path'; 
import { format } from 'date-fns'; 
import zodiakData from '@/data/zodiak.json';

export async function getTodayZodiak() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const dirPath = path.join(process.cwd(), 'data', 'arsip-zodiak');
  const filePath = path.join(dirPath, ${today}.json);

if (!fs.existsSync(filePath)) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); }

const data = {
  date: today,
  zodiak: zodiakData
};

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

}

const json = fs.readFileSync(filePath, 'utf-8'); 
  return JSON.parse(json); 
}

                 
