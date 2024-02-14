# Auto-keep-online

This script is based on the node environment and regularly accesses web pages, including intermittent access and uninterrupted access, running together to ensure that the container is active.

# Instructions for use 
1: Used in containers or vps based on node environment (you need to install the node environment yourself).

2: Upload the index.js and package.json files to the root directory of the running environment.

3: The URLs in lines 9 to 16 in index.js are URLs that can be accessed 24 hours a day without interruption. The number of URLs can be increased downwards, with no limit to the number; 86 lines of access cycle, with a default of 2 minutes, can be set according to needs.

4: Lines 23 to 26 in index.js suspend access from 1 a.m. to 5 a.m., and are URLs for normal access at other times. The 64-line access period defaults to 2 minutes and can be set according to your needs.

# Applicable platforms
*Including but not limited to Glitch, Rendenr, Back4app, clever cloud, Zeabur, codesanbox, replit. . . Wait, physical shutdown of containers is not supported.
* The keep-alive project deployed on huggingface https://huggingface.co/Niansuh can directly copy my space and modify the address in index.js.
